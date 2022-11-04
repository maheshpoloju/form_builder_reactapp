import { useState } from "react";
import "./App.css";

const formOptions = [
  {
    id: "email",
    type: "Email",
    placeholder: "Enter email",
  },
  {
    id: "text",
    type: "Text",
    placeholder: "Enter text",
  },
  {
    id: "password",
    type: "Password",
    placeholder: "Enter password",
  },
  {
    id: "number",
    type: "Number",
    placeholder: "Enter number",
  },
  {
    id: "date",
    type: "Date",
    placeholder: "Enter date",
  },
];

function App() {
  const [formType, setFormType] = useState(formOptions[0].id);
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
    const tempData = formOptions.filter((each) => {
      if (each.id === formType) {
        return {
          id: each.id,
          type: each.type,
        };
      }
    });

    const newFormField = {
      id: tempData[0].id,
      type: tempData[0].type,
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
        id: newFormType,
        type: newFormTypeLabel,
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
  // console.log(formFieldData);
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
              value={formOption.id}
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
              className="input-field"
              type="text"
              placeholder="Enter type"
            />
          </div>
          <div>
            <input
              value={newFormTypeLabel}
              onChange={(e) => setNewFormTypeLabel(e.target.value)}
              className="input-field"
              type="text"
              placeholder="Enter label"
            />
          </div>
          <div>
            <input
              value={newFormTypePlaceholder}
              onChange={(e) => setNewFormTypePlaceholder(e.target.value)}
              className="input-field"
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
                  {each.type}
                </label>
                <input
                  placeholder={each.placeholder}
                  className="input-field"
                  id={each.id}
                  type={each.type}
                />
              </div>
            );
          })}
          {formFieldData.length > 0 && (
            <div className="save-button-container">
              <button
                onClick={handleNewFieldsButton}
                className="form-save-button"
              >
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
