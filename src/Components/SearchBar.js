import { FormControl, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

export default function SearchBar(search){
    return(
        <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
                <InputGroup className="col-6">
                    <FormControl placeholder="Search Film"
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                      onChange={(e)=>{
                        search.onSearch(e);
                      }}/>
                      <Button variant="outline-secondary" id="button-addon2">
                        <Search/>
                      </Button>
                </InputGroup>
            </div>
        </div>
    )
}