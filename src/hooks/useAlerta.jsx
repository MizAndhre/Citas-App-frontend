import { useContext } from "react";
import AlertaContext from "../context/AlertaProvider";

const useAlerta = () => {
	return useContext(AlertaContext);
};

export default useAlerta;
