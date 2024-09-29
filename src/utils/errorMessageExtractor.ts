
export default function errorMessageExtractor(payload: any): string {
    console.log('errorMessageExtractor', payload);
    if (payload.response?.data?.message) {
        return payload.response.data.message;
    } else if (payload.response?.violations && payload.response.violations.length > 0) {
        return payload.response.violations[0].propertyPath +
            ': ' + payload.response.violations[0].message;
    } else {
        return payload.message;
    }
}
