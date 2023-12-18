import logo from '../logo.svg';



function AuthWrapper({ pageTitle, children }) {

    return (
        <div className='auth d-flex flex-column justify-content-center align-items-center' style={{ height: '75vh' }}>
            <img style={{ paddingLeft: "75px" }} src={logo} alt="Logo" width="500px" height="300px" />
            <h2 style={{ marginBottom: "20px" }} className="font-weight-bold">{pageTitle}</h2>
            {children}
        </div>
    )

}

export default AuthWrapper;