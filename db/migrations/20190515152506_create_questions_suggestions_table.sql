-------------------------------------- UP --------------------------------------

CREATE TABLE api.answers_suggestions(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

  question_id uuid NOT NULL REFERENCES api.questions(id),
  user_id uuid REFERENCES auth.users(id)
);

CREATE CONSTRAINT TRIGGER ensure_user_can_update_answer_suggestion
  AFTER UPDATE ON api.answers_suggestions
  FOR EACH ROW
  EXECUTE PROCEDURE check_user_can_update_answer();

GRANT SELECT, INSERT, DELETE ON api.answers_suggestions TO contributor;
GRANT SELECT, INSERT, UPDATE, DELETE ON api.answers_suggestions TO administrator;

------------------------------------- DOWN -------------------------------------

DROP TABLE api.answers_suggestions;
