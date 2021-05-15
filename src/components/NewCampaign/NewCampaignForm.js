import React from "react";
import { Formik } from "formik";
import { Button, TextField } from "@material-ui/core";

import { createCampaign } from "../../services/campaign";
import { readFile } from "../../services/file";

class NewCampaignForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: "",
      error: "",
    };
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const recipientsFromTextInput = (values.recipients || "").split(/[,\s]/);
    let recipientsFromFileInput = [];

    if (values.recipientsFile) {
      recipientsFromFileInput = (await readFile(values.file)).split(/[,\s]/);
    }

    const leads = recipientsFromTextInput
      .concat(recipientsFromFileInput)
      .filter((e) => !!e);

    try {
      await createCampaign(values.name, values.subject, values.body, leads);
      this.setState({ success: "Campaign emails are on their way!" });

      // close the dialog after a little bit
      // setTimeout(this.props.onSubmit, 1000);

      // shame on me
      // TODO: better way to refresh campaign list
      setTimeout(() => window.location.reload(), 1000);
    } catch (e) {
      let msg = e.error || e.message;
      if (e.message === "NO_LEADS_VALID")
        msg = "None of the leads were valid emails";
      else if (e.message === "TOKEN_EXPIRED")
        msg = `Your token has expired. Please log in again.`;

      this.setState({ error: msg });
      setSubmitting(false);
    }
  };

  render() {
    return (
      <Formik
        validate={(values) => {
          let errors = {};
          if (!values.recipients && !values.recipientsFile) {
            errors.recipients = "Specify at least one recipient";
          }
          return errors;
        }}
        onSubmit={this.handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              autoComplete="off"
              margin="dense"
              id="name"
              value={values.name}
              onChange={handleChange}
              label="Campaign Name (for internal reference only)"
              type="text"
              fullWidth
              required={true}
            />

            <TextField
              autoComplete="off"
              margin="dense"
              id="recipients"
              value={values.recipients}
              onChange={handleChange}
              label="Recipients (comma-separated emails)"
              type="text"
              fullWidth
            />

            <label htmlFor="recipientsFile">
              (Or) add recipient emails from CSV:
            </label>
            <input
              accept=".csv,.txt"
              id="recipientsFile"
              value={values.recipientsFile}
              onChange={(event) => {
                setFieldValue("file", event.currentTarget.files[0]);
                handleChange(event);
              }}
              type="file"
            />

            {errors.recipients ? (
              <div
                className="input-feedback"
                style={{ color: "red", fontSize: "10px", margin: "5px 0" }}
              >
                {errors.recipients}
              </div>
            ) : null}

            <TextField
              autoComplete="off"
              margin="dense"
              id="subject"
              value={values.subject}
              onChange={handleChange}
              label="Email Subject"
              type="text"
              fullWidth
              required={true}
            />

            <TextField
              autoComplete="off"
              margin="dense"
              id="body"
              value={values.body}
              onChange={handleChange}
              label="Email Body"
              type="text"
              multiline={true}
              rows={8}
              rowsMax={20}
              fullWidth
              required={true}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>

            {this.state.success ? (
              <div
                className="input-feedback"
                style={{ color: "green", fontSize: "10px", margin: "5px 0" }}
              >
                {this.state.success}
              </div>
            ) : this.state.error ? (
              <div
                className="input-feedback"
                style={{ color: "red", fontSize: "10px", margin: "5px 0" }}
              >
                {this.state.error}
              </div>
            ) : null}
          </form>
        )}
      </Formik>
    );
  }
}

export default NewCampaignForm;
