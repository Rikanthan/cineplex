import { useCallback } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

export default function SearchBar(search){
  const onSearch = useCallback(()=>(event)=>{
    search.onSearch(event)
  },[])
    return(
        <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
                <InputGroup className="col-6">
                    <FormControl placeholder="Search Film"
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                      onChange={onSearch}/>
                      <Button variant="outline-secondary" id="button-addon2">
                        <Search/>
                      </Button>
                </InputGroup>
            </div>
        </div>
    )
}