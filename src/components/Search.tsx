import React , { useState } from 'react';
import { SearchProps} from '../Types';

const Search = (props : SearchProps) =>
{
    const [searchValue , setSearchValue] = useState("");

    const handleSearchInputChanges = (e : React.ChangeEvent<HTMLInputElement>) =>
    {
        setSearchValue(e.target.value);
    }

    const resetInputField = () =>
    {
        setSearchValue("");
    }

    const callSearchFunction = (e : React.MouseEvent<HTMLInputElement>) =>
    {
        // 検索ワード入力中にユーザーの入力を受け付けないようにするため
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    }

    return (
        <form className="search">
            <input
                value = { searchValue }
                onChange = { handleSearchInputChanges }
                type = "text"
            />
            <input
                onClick = { callSearchFunction }
                type = "submit"
                value = "SEARCH"
            />
        </form>
    );
};

export default Search;