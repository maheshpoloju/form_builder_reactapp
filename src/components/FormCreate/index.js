import { useState } from "react";
import "./index.css";

const formOptions = [
  {
    id: 1,
    type: "email",
    label: "Email",
    placeholder: "Enter email",
  },
  {
    id: 2,
    type: "text",
    label: "Text",
    placeholder: "Enter text",
  },
  {
    id: 3,
    type: "password",
    label: "Password",
    placeholder: "Enter password",
  },
  {
    id: 4,
    type: "number",
    label: "Number",
    placeholder: "Enter number",
  },
  {
    id: 5,
    type: "date",
    label: "Date",
    placeholder: "Enter date",
  },
];

function FormCreate() {
  const [formType, setFormType] = useState(formOptions[0].type);
  const [formFieldData, setFormFieldData] = useState([]);
  const [showNewformFields, setShowNewformFields] = useState(false);
  const [isFormTitleChangeClicked, setIsFormTitleChangeClicked] = useState(
    false
  );
  const [formTitle, setFormTitle] = useState("Form title here");
  const [newFormTitle, setNewFormTitle] = useState("");
  const [newFormType, setNewFormType] = useState("");
  const [newFormTypeLabel, setNewFormTypeLabel] = useState("");
  const [newFormTypePlaceholder, setNewFormTypePlaceholder] = useState("");

  const handleFormType = (e) => {
    setFormType(e.target.value);
  };

  const handleCreateFormType = () => {
    const tempData = formOptions.filter((each) => each.type === formType);

    const newFormField = {
      id:
        formFieldData.length === 0
          ? 1
          : formFieldData[formFieldData.length - 1].id + 1,
      type: tempData[0].type,
      label: tempData[0].label,
      placeholder: tempData[0].placeholder,
    };
    if (formFieldData.length < 20) {
      setFormFieldData([...formFieldData, newFormField]);
    }
  };

  const handleNewCreateFormType = () => {
    if (
      newFormType !== "" &&
      newFormTypeLabel !== "" &&
      newFormTypePlaceholder !== ""
    ) {
      const newFormField = {
        id:
          formFieldData.length === 0
            ? 1
            : formFieldData[formFieldData.length - 1].id + 1,
        type: newFormType,
        label: newFormTypeLabel,
        placeholder: newFormTypePlaceholder,
      };
      if (formFieldData.length < 20) {
        setFormFieldData([...formFieldData, newFormField]);
      }
    }

    setNewFormType("");
    setNewFormTypeLabel("");
    setNewFormTypePlaceholder("");
  };

  const handleNewFieldsButton = () => {
    setShowNewformFields((prevState) => !prevState);
  };

  const handleFormTitleChange = () => {
    setIsFormTitleChangeClicked((prevState) => !prevState);
    setFormTitle(newFormTitle);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  const handleFormSave = async () => {
    const data = { formData: formFieldData, formTitle: formTitle };
    setFormFieldData([]);
    const url = "http://localhost:8080/api/form/create";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const postDataResponse = await fetch(url, options);
  };

  const handleDeleteInput = (id) => {
    const tempData = formFieldData.filter((each) => each.id !== id);
    setFormFieldData(tempData);
  };

  return (
    <div className="App">
      <h1 className="create-form-heading">Create a Form</h1>
      <div className="available-types-container">
        <label className="available-label">Available</label>
        <select
          className="create-form-type-field"
          value={formType}
          onChange={handleFormType}
        >
          {formOptions.map((formOption) => (
            <option
              className="form-type"
              key={formOption.id}
              value={formOption.type}
            >
              {formOption.type}
            </option>
          ))}
        </select>
        <button
          onClick={handleCreateFormType}
          className="form-type-create-button"
        >
          Create
        </button>
      </div>
      <button onClick={handleNewFieldsButton} className="new-field-button">
        {showNewformFields ? "Close" : "Create new field type"}
      </button>

      {showNewformFields && (
        <div className="new-form-fields-container">
          <div>
            <input
              value={newFormType}
              onChange={(e) => setNewFormType(e.target.value)}
              className="input-field new-input-field"
              type="text"
              placeholder="Enter type"
            />
          </div>
          <div>
            <input
              value={newFormTypeLabel}
              onChange={(e) => setNewFormTypeLabel(e.target.value)}
              className="input-field new-input-field"
              type="text"
              placeholder="Enter label"
            />
          </div>
          <div>
            <input
              value={newFormTypePlaceholder}
              onChange={(e) => setNewFormTypePlaceholder(e.target.value)}
              className="input-field new-input-field"
              type="text"
              placeholder="Enter placeholder"
            />
          </div>
          <button
            onClick={handleNewCreateFormType}
            className="form-type-create-button new-form-type-create-button"
          >
            Create
          </button>
        </div>
      )}
      <div className="form-title-container">
        {isFormTitleChangeClicked ? (
          <input
            value={newFormTitle}
            onChange={(e) => setNewFormTitle(e.target.value)}
            className="new-form-title-field"
            type="text"
            placeholder="Enter new form title"
          />
        ) : (
          <h1 className="form-title">{formTitle}</h1>
        )}

        <button
          className="form-title-change-button"
          onClick={handleFormTitleChange}
        >
          {isFormTitleChangeClicked ? "Save" : "Change"}
        </button>
      </div>
      <div className="form-container">
        <form className="form" onSubmit={handleFormSubmit}>
          {formFieldData.map((each, index) => {
            return (
              <div className="input-filed-container" key={index}>
                <label className="form-label" htmlFor={each.id}>
                  {each.label}
                </label>
                <input
                  placeholder={each.placeholder}
                  className="input-field"
                  id={each.id}
                  type={each.type}
                />
                <button
                  onClick={() => handleDeleteInput(each.id)}
                  className="delete-input-button"
                >
                  Delete
                </button>
              </div>
            );
          })}
          {formFieldData.length > 0 && (
            <div className="save-button-container">
              <button onClick={handleFormSave} className="form-save-button">
                Save Form
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default FormCreate;
