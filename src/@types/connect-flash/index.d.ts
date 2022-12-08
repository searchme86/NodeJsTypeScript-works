declare module 'connect-flash' {
  global {
    namespace Express {
      interface Request {
        flash(message: string): void;
      }
    }
  }

  import express from 'express';
  function flash(): express.RequestHandler;
  export default flash;
}
