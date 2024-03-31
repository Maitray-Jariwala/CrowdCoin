import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  // we are passing props here, because we created a route for address in 'routes.js' file, it is a seperate props object than the one that ends up inside our component instance
  static async getInitialProps(props) {
    // console.log(props.query.address); // this is the actual address of the campaign that we show to our user

    const campaign = Campaign(props.query.address);
    console.log(await campaign.methods.getSummary().call());
    try {
      const summary = await campaign.methods.getSummary().call();
      // console.log(summary["0"]);

      return {
        address: props.query.address,
        minimumContribution: parseInt(summary["0"]),
        balance: parseInt(summary["1"]),
        requestsCount: parseInt(summary["2"]),
        approversCount: parseInt(summary["3"]),
        manager: summary["4"],
      }; // returning an object, as next.js expects its to
    } catch (err) {
      console.error("Error fetching contract details:", err);
      return {};
    }
  }

  //   creating method to create cards
  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props;

    // can use this approach but will need to change these variablesin each and every file
    // const minimumContributionInWei = Number(minimumContribution);
    // const campaignRequestCount = Number(requestsCount);

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "Manager Created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. It may be approved by approvers",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "number of people who have already contributed to this Campaign",
      },
      {
        header: parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(6),
        meta: "Campaign Balance (ether)",
        description:
          "The Balance is how much money this campaign has left to spend",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
// to get information or Summary and details of the contract, we, instead of creating four differenct funtion calls (as we are gonna display four types of information) we will be making one instance to get all the details
