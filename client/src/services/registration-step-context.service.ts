class RegistrationStepContextService {

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private stepSubmitter: () => void = () => {};
    private stepValidator: () => Promise<boolean> = () => Promise.resolve(true);
    private loading = false;

    public setStepSubmitter(submitter: () => void) {
        this.stepSubmitter = submitter;
    }

    public setStepValidator(validator: () => Promise<boolean>) {
        this.stepValidator = validator;
    }

    public setLoading(loading: boolean) {
        this.loading = loading;
    }

    public getLoading() {
        return this.loading;
    }

    public submitStep() {
        this.stepSubmitter();
    }

    public validateStep() {
        return this.stepValidator();
    }

    disconnect() {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.stepSubmitter = () => {};
        this.stepValidator = () => Promise.resolve(true);
    }
}

export const registrationStepContextService = new RegistrationStepContextService();