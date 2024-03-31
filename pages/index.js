import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
  // we use static so that without actually rendering a complete Component, we can just call its instance, or the part of Component that we need
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns: campaigns };
  }

  // async componentDidMount() {
  //   console.log(campaigns);
  // } now we dont need this

  renderCampaigns() {
    // we pass a function into 'map' and it will be called one time for every element in the 'campaigns' array
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign!</a>
          </Link>
        ),
        fluid: true,
      };
      // fuild : true --> the card will strach the width of the container
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaign</h3>

          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              ></Button>
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;

// we want a header, that will give user the ability to search, createCampaign, and will prompt our Website name for all the pages that we create.
// and to do that we do not want to write the whole code again and again for all the pages that we create
// to do that we will be using the child system of react
