-------------------------------------- UP --------------------------------------

CREATE TYPE contributor_answers_references AS (
  category answer_reference_category,
  value text,
  url text
);

CREATE VIEW api.contributor_answers AS
SELECT
    answers.*,
    questions.value AS question,
    agreements.name AS agreement,
    agreements.idcc,
    -- https://stackoverflow.com/a/23050948/2736233
    array_remove(array_agg(tags.tag_id), NULL) AS tags,
    -- https://stackoverflow.com/a/34163623/2736233
    array_remove(
      array_agg(
        (refs.category, refs.value, refs.url)::contributor_answers_references
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
    questions.value,
    agreements.name,
    agreements.idcc;

GRANT SELECT ON api.contributor_answers TO contributor;

------------------------------------- DOWN -------------------------------------

DROP VIEW api.contributor_answers;

DROP TYPE contributor_answers_references;
