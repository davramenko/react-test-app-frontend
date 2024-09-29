export default function InputWrapper(props: any) {
    let errorMessage: string[] | string = '';
    for (const violation of props.violations) {
        if (props.inputName === violation.propertyPath) {
            if (Array.isArray(errorMessage)) {
                errorMessage.push(violation.message);
            } else if (errorMessage.length === 0) {
                errorMessage = violation.message;
            } else {
                errorMessage = [errorMessage, violation.message];
            }
        }
    }
    // console.log('InputWrapper: inputName: ', props.inputName)
    // console.log('InputWrapper: violations: ', props.violations)

    return (<div>
        {props.children}
        {errorMessage && (
            <div style={{color: "red", marginBottom: "15px"}}>{
                Array.isArray(errorMessage)
                    ? (<ul>{errorMessage.map(message => (<li>{message}</li>))}</ul>)
                    : (<span>{errorMessage}</span>)
            }</div>)}
    </div>);
}