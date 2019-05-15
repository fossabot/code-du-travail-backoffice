import React from "react";
import { Flex } from "rebass";
import styled from "styled-components";

import Button from "../../elements/Button";
import Field from "../../elements/Field";
import Icon from "../../elements/Icon";
import Input from "../../elements/Input";
import Subtitle from "../../elements/Subtitle";

const Container = styled(Flex)`
  color: #555555;
  padding: 1rem;
`;
const List = styled.span`
  border-top: solid 1px var(--color-silver-sand);
  margin-top: 1rem;
  padding-top: 1rem;
`;
const Text = styled.span`
  margin-left: 1rem;
`;

export default class AnswerEditionSuggestions extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formKey: 0,
      suggestions: props.suggestions
    };
  }

  addLaborCodeReference({ value }) {
    const reference = {
      category: "labor_code",
      url: null,
      value
    };

    this.setState({
      suggestions: [...this.state.suggestions, reference]
    });

    this.props.onAdd(reference);
  }

  removeLaborCodeReference(value) {
    this.setState({
      suggestions: this.state.suggestions.filter(
        ({ value: _value }) => _value !== value
      )
    });

    this.props.onRemove(value);
  }

  async addSuggestion(event) {
    event.preventDefault();
    if (this.$value.value.length === 0) return;

    await this.props.onAdd(this.$value.value);

    this.setState({ formKey: this.state.formKey + 1 });
  }

  render() {
    return (
      <Container flexDirection="column" width={1}>
        <Flex flexDirection="column">
          <Subtitle isFirst>
            {`Suggestions d'intitulé de question alternatifs :`}
          </Subtitle>
          <p>
            {`Vous pouvez ajouter autant de suggestions d'intitulé alternatifs
            pour cette question que désiré :`}
          </p>

          <form
            key={this.state.formKey}
            onSubmit={this.addSuggestion.bind(this)}
            role="form"
          >
            <Field>
              <Input
                placeholder="Nouvel intitulé"
                ref={node => (this.$value = node)}
              />
            </Field>
            <Field>
              <Button title="Ajouter une suggestion" type="submit">
                Ajouter une suggestion
              </Button>
            </Field>
          </form>
        </Flex>
        <List>
          {this.props.suggestions.map(({ id, value }, index) => (
            <Flex alignItems="center" key={index}>
              <Icon color="black" icon="circle" isSmall />
              <Text>{value}</Text>
              <Button
                icon="trash"
                onClick={() => this.props.onRemove(id)}
                title={`Bouton supprimant ${this.props.ariaName} : ${value}`}
              />
            </Flex>
          ))}
        </List>
      </Container>
    );
  }
}
