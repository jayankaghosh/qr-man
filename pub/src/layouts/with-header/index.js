import Header from "components/header";

const WithHeader = ({ children }) => {
    return (
        <div className={'With-Header-Layout'}>
            <Header />
            { children }
        </div>
    )
}

export default WithHeader;