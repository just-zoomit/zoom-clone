import { useState, useEffect } from "react";
import axios from "axios";

// Adopted custom hook pattern. It does care about the state of the form

export const useResource = (resourceUrl) => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get(resourceUrl);
            console.log("UseResource response.data: ", response.data)
            setResources(response.data);
        })();
    }, [resourceUrl]);

    return resources;
};