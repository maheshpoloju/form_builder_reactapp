import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./index.css";

function FormEdit() {
  const [formsData, setFormsData] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [showEditFormFields, setShowEditFormFields] = useState(false);
  const [editTypeID, setEditTypeID] = useState(null);
  const [formType, setFormType] = useState("");
  const [formLabel, setFormLabel] = useState("");
  const [formPlaceholder, setFormPlaceholder] = useState("");

  let { id } = useParams();

  const getFormData = async () => {
    const url = `http://localhost:8080/api/form/edit/${id}`;
    const options = {
      method: "GET",
    };

    const fetchResponse = await fetch(url, options);
    const data = await fetchResponse.json();
    const { formData, formTitle } = data;

    setFormsData(formData);
    setFormTitle(formTitle);
  };
  useEffect(() => {
    getFormData();
  }, [formsData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  const handleEditInput = (id) => {
    const result = formsData.filter((each) => each._id === id);

    result.map((each) => {
      setFormType(each.type);
    });
    setEditTypeID(id);
    setShowEditFormFields((prev) => !prev);
  };

  const handleEditInputSave = async (formTypeID) => {
    setShowEditFormFields(false);
    const url = `http://localhost:8080/api/form/edit-type/${id}`;

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formTypeID, formType }),
    };
    const postDataResponse = await fetch(url, options);
  };

  const handleBackButton = () => {
    setShowEditFormFields(false);
  };
  return (
    <div>
      <h1 className="edit-forms-heading">Edit Form</h1>
      <div className="edit-form-container">
        <h1 className="edit-forms-data-heading">{formTitle}</h1>
        <form className="edit-form" onClick={handleFormSubmit}>
          {formsData &&
            formsData.map((each, index) => {
              return showEditFormFields ? (
                editTypeID === each._id && (
                  <div className="new-edit-form-fields-container" key={index}>
                    <div>
                      <input
                        value={formType}
                        onChange={(e) => setFormType(e.target.value)}
                        className="new-edit-input-field"
                        type="text"
                        placeholder="Enter type"
                      />
                    </div>
                    <div>
                      <input
                        value={formLabel}
                        onChange={(e) => setFormLabel(e.target.value)}
                        className="new-edit-input-field"
                        type="text"
                        placeholder="Enter label"
                      />
                    </div>
                    <div>
                      <input
                        value={formPlaceholder}
                        onChange={(e) => setFormPlaceholder(e.target.value)}
                        className="new-edit-input-field"
                        type="text"
                        placeholder="Enter placeholder"
                      />
                    </div>
                    <button
                      onClick={() => handleEditInputSave(each._id)}
                      className="new-form-type-create-button"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleBackButton}
                      className="new-form-type-create-button go-back-button"
                    >
                      Back
                    </button>
                  </div>
                )
              ) : (
                <div className="edit-div">
                  <div className="edit-input-filed-container" key={index}>
                    <label className="edit-form-label" htmlFor={each._id}>
                      {each.type}
                    </label>
                    <input
                      placeholder={each.placeholder}
                      className="edit-input-field"
                      id={each.id}
                      type={each.type}
                    />
                    <button
                      onClick={() => handleEditInput(each._id)}
                      className="edit-input-button"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
        </form>
      </div>
    </div>
  );
}

export default FormEdit;
