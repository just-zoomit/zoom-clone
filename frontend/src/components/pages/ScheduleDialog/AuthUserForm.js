import {useState, useEffect} from "react";

/*
    Adpoted the controlled form pattern. It cares about the state of the form.
*/

export const AuthUserForm = () => {
    const [nameInputError, setNameInputError] = useState('');
    const initialFormData = {
        name: '',
        age: '',
        hairColorInput: '',
      };

    const [formData, setFormData] = useState(initialFormData);
    const { name, age, hairColorInput } = formData;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((formData) => ({...formData,[name]: value}));
      };

    console.log("Name", name);
    console.log("Age", age);
    console.log("hairColor",hairColorInput);
    console.log("Name", formData);

    // Benefit of controlled form is that we can
    // use the state to do things like validation
    useEffect(() => {
        
        if (name.length < 2) {
            
            setNameInputError("Name must be at least 2 characters");
           
        }else {
            setNameInputError("");
        }
      
    }, [name, age, hairColorInput])
    

    const handleSubmit = (event) => {
      
        event.preventDefault();
        //submit the form data to the server here

        setFormData(initialFormData); // reset the form data to its initial 

    }

    return (
        
        <form onSubmit={handleSubmit} >
        {nameInputError && <p>{nameInputError}</p> }
        <input 
        type="text" 
        name="name" 
        placeholder="Name" 
        value={formData.name}
        onChange={handleChange}
        />
        <br />
        <input 
        type="text" 
        name="age" 
        placeholder="Age" 
        value={formData.age} 
        onChange={handleChange}
        />
        &nbsp;
        <br />
        
        <input 
        type="text" 
        name="Hair Color" 
        placeholder="Hair Color" 
        value={formData.hairColorInput}
        onChange={handleChange}
        />
       
        <br />
     
        <button onClick={handleSubmit} type="submit">Submit</button>
        &nbsp; &nbsp;
        </form>

    )
}