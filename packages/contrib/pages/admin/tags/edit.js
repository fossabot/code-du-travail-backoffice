import React from "react";

import AdminForm from "../../../src/components/AdminForm";
import AdminMain from "../../../src/layouts/AdminMain";
import customAxios from "../../../src/libs/customAxios";
import AdminTagsNewPage from "./new";

export default class AdminTagsEditPage extends AdminTagsNewPage {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      data: {},
      isLoading: true
    };
  }

  static getInitialProps({ query: { id } }) {
    return { id };
  }

  async componentDidMount() {
    const axios = customAxios();

    try {
      const uri = `/tags?id=eq.${this.props.id}`;

      const { data: tags } = await axios.get(uri);

      const data = tags[0];

      this.setState({
        data,
        isLoading: false
      });
    } catch (err) {
      if (err !== undefined) console.warn(err);
    }
  }

  render() {
    if (this.state.isLoading) return <AdminMain isLoading />;

    const { value } = this.state.data;

    return (
      <AdminForm
        apiPath="/tags"
        ariaLabels={{
          cancelButton: `Bouton redirigeant vers la liste des étiquettes`,
          createOrEditButton: `Bouton mettant à jour l'étiquette "${value}"
                              dans la base de données à partir des données du
                              formulaire`
        }}
        defaultData={this.state.data}
        fields={this.state.fields}
        id={this.props.id}
        indexPath="/tags"
        title={`Modifier l'étiquette « ${value} »`}
      />
    );
  }
}
