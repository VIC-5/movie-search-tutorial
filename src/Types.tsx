// APIから取得するKeyが大文字始まりのため、Propertyを大文字始まりにした
export type MovieInfo =
{
    Title : string ,
    Year : string ,
    Poster : string ,
};

export type MovieProps =
{
    movie : MovieInfo ,
};

export type SearchProps =
{
    search : (searchValue : string) => void ,
};

export type HeaderProps =
{
    text : string ,
};

export type TState =
{
    loading : boolean ,
    movies : MovieInfo[] ,
    errorMessage : string | null ,
};

type RequestAction =
{
    type : "SEARCH_MOVIES_REQUEST" ,
};

type SuccessAction =
{
    type : "SEARCH_MOVIES_SUCCESS" ,
    payload : MovieInfo[] ,
};

type FailureAction =
{
    type : "SEARCH_MOVIES_FAILURE" ,
    error : string ,
};

// Action毎にセットしたい値が違うので、それぞれのActionを定義し複合Typeとした
export type TAction = RequestAction | SuccessAction | FailureAction;