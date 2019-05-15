-------------------------------------- UP --------------------------------------

CREATE TABLE api.answers_suggestions(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  value text UNIQUE NOT NULL,

  question_id uuid NOT NULL REFERENCES  api.questions(id),
  user_id uuid REFERENCES auth.users(id)
);

CREATE CONSTRAINT TRIGGER ensure_user_can_update_answer_suggestion
  AFTER UPDATE ON api.answers_suggestions
  FOR EACH ROW
  EXECUTE PROCEDURE check_user_can_update_answer();

GRANT SELECT, INSERT, DELETE ON api.answers_suggestions TO contributor;
GRANT SELECT, INSERT, UPDATE, DELETE ON api.answers_suggestions TO administrator;

DROP VIEW api.contributor_answers;

CREATE VIEW api.contributor_answers AS
SELECT
    answers.*,
    questions.id AS question_id,
    questions.index AS index,
    questions.value AS question,
    agreements.name AS agreement,
    agreements.idcc,
    -- https://stackoverflow.com/a/23050948/2736233
    array_remove(array_agg(DISTINCT tags.tag_id), NULL) AS tags,
    -- https://stackoverflow.com/a/34163623/2736233
    array_remove(
      array_agg(
        DISTINCT (
          refs.category,
          refs.value,
          refs.url
        )::text::contributor_answers_references
      ),
      (NULL, NULL, NULL)::contributor_answers_references
    ) AS references
  FROM api.answers answers
  LEFT JOIN api.questions questions ON questions.id = answers.question_id
  LEFT JOIN api.agreements agreements ON agreements.id = answers.agreement_id
  LEFT JOIN api.answers_tags tags ON tags.answer_id = answers.id
  LEFT JOIN api.answers_references refs ON refs.answer_id = answers.id
  WHERE
    answers.agreement_id = ANY(get_current_user_agreements()::uuid[])
    AND (
      answers.user_id = current_setting('request.jwt.claim.id', true)::uuid
      OR answers.user_id IS NULL
    )
  GROUP BY
    answers.id,
    questions.index,
    questions.value,
    agreements.name,
    agreements.idcc;

GRANT SELECT ON api.contributor_answers TO contributor;

------------------------------------- DOWN -------------------------------------

DROP VIEW api.contributor_answers;

CREATE VIEW api.contributor_answers AS
SELECT
    answers.*,
    questions.index AS index,
    questions.value AS question,
    agreements.name AS agreement,
    agreements.idcc,
    -- https://stackoverflow.com/a/23050948/2736233
    array_remove(array_agg(DISTINCT tags.tag_id), NULL) AS tags,
    -- https://stackoverflow.com/a/34163623/2736233
    array_remove(
      array_agg(
        DISTINCT (
          refs.category,
          refs.value,
          refs.url
        )::text::contributor_answers_references
      ),
      (NULL, NULL, NULL)::contributor_answers_references
    ) AS references
  FROM api.answers answers
  LEFT JOIN api.questions questions ON questions.id = answers.question_id
  LEFT JOIN api.agreements agreements ON agreements.id = answers.agreement_id
  LEFT JOIN api.answers_tags tags ON tags.answer_id = answers.id
  LEFT JOIN api.answers_references refs ON refs.answer_id = answers.id
  WHERE
    answers.agreement_id = ANY(get_current_user_agreements()::uuid[])
    AND (
      answers.user_id = current_setting('request.jwt.claim.id', true)::uuid
      OR answers.user_id IS NULL
    )
  GROUP BY
    answers.id,
    questions.index,
    questions.value,
    agreements.name,
    agreements.idcc;

GRANT SELECT ON api.contributor_answers TO contributor;

DROP TABLE api.answers_suggestions;
