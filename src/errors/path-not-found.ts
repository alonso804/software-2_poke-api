import BaseError from './base-error';

type Props = {
  path: string;
  method: string;
};

class PathNotFound extends BaseError {
  constructor({ path, method }: Props) {
    super(404, `[${method}] '${path}' not found`);
  }
}

export default PathNotFound;
