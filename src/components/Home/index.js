import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Home() {
  const [formsData, setFormsData] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [formID, setFormID] = useState("");
  let formCount = 0;

  const fetchFormData = async () => {
    const url = "http://localhost:8080/api/";
    const options = {
      method: "GET",
    };

    const fetchResponse = await fetch(url, options);
    const data = await fetchResponse.json();

    setFormsData(data);
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  let navigate = useNavigate();
  const handleCreateForm = () => {
    navigate("/form/create");
  };
  const handleEditForm = (id) => {
    navigate(`/form/edit/${id}`);
  };

  return (
    <div className="form-options-container">
      <button onClick={handleCreateForm} className="form-create-button">
        Create Form
      </button>
      <div className="forms-data-container">
        <h1 className="forms-data-heading">Forms Data</h1>
        {formsData &&
          formsData.map((data, i) => {
            const { formData, formTitle, _id } = data;
            formCount += 1;

            return (
              <>
                <h1 className="view-form-title">
                  {formTitle && `${formCount}. ${formTitle}`}
                </h1>
                <div className="view-form-container" key={i}>
                  <form className="view-form">
                    {formData &&
                      formData.map((each, index) => {
                        return (
                          <div
                            className="view-input-filed-container"
                            key={index}
                          >
                            <label
                              className="view-form-label"
                              htmlFor={each._id}
                            >
                              {/* {each.label} */}
                              {each.type}
                            </label>
                            <input
                              placeholder={each.placeholder}
                              className="view-input-field"
                              id={each.id}
                              type={each.type}
                            />
                          </div>
                        );
                      })}
                  </form>
                  <div>
                    <button
                      onClick={() => handleEditForm(_id)}
                      className="form-edit-button"
                    >
                      Edit Form
                    </button>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
