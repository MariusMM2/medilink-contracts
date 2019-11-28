export abstract class ErrorComponent {
  protected error: string;

  protected parseError(error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    switch (errorCode) {
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        this.error = 'Invalid Username or Password.';
        break;
      default:
        this.error = errorMessage;
    }
    console.log('errorCode:' + errorCode);
    console.log('errorMessage:' + errorMessage);
  }
}
