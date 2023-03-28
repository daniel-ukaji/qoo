import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, selectFormData } from '../reduxstore/formSlice';

function MultiStepForm() {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const [step, setStep] = useState(0);

  function handleInputChange(event) {
    const { name, value } = event.target;
    dispatch(updateFormData({ [name]: value }));
  }

  function handleCheckboxChange(event) {
    const { name, checked } = event.target;
    dispatch(updateFormData({ [name]: checked }));
  }

  function handleOptionChange(event) {
    const { name, value } = event.target;
    dispatch(updateFormData({ [name]: value }));
  }

  function handleStepSubmit(event) {
    event.preventDefault();
    setStep(step + 1);
  }

  return (
    <form onSubmit={handleStepSubmit}>
      {step === 0 && (
        <div>
          <h2>Step 1</h2>
          <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} />
          <button type="submit">Next</button>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2>Step 2</h2>
          <label>
            <input type="checkbox" name="checkbox1" checked={formData.checkbox1 || false} onChange={handleCheckboxChange} />
            Checkbox 1
          </label>
          <label>
            <input type="checkbox" name="checkbox2" checked={formData.checkbox2 || false} onChange={handleCheckboxChange} />
            Checkbox 2
          </label>
          <button type="submit">Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 3</h2>
          <label>
            <input type="radio" name="option" value="option1" checked={formData.option === 'option1'} onChange={handleOptionChange} />
            Option 1
          </label>
          <label>
            <input type="radio" name="option" value="option2" checked={formData.option === 'option2'} onChange={handleOptionChange} />
            Option 2
          </label>
          <button type="submit">Submit</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Form submitted!</h2>
          <p>Name: {formData.name}</p>
          <p>Checkbox 1: {formData.checkbox1 ? 'checked' : 'unchecked'}</p>
          <p>Checkbox 2: {formData.checkbox2 ? 'checked' : 'unchecked'}</p>
          <p>Option: {formData.option}</p>
        </div>
      )}
    </form>
  );
}

export default MultiStepForm;
