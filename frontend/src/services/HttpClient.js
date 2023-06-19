export class HttpClient {
  /*
		The constructor takes parameters:
		* httpProvider - the provider that will connect
		* getToken - function to get authentication token
		* baseUrl - base URL for a specific resource
  */
  constructor(options) {
    if (!options.baseURL) {
      throw Error("[HttpClient]: Base url is empty");
    }
    this.httpProvider = options.httpProvider;
    this.getToken = options.getToken;
    this.baseUrl = options.baseURL;
  }

  buildRequest(options = {}) {
    const token = this.getToken();
    let headers = {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
    if (options.headers) {
      headers = {
        ...headers,
        ...options.headers,
      };
    }

    return {
      baseUrl: this.baseUrl,
      headers,
      ...options,
    };
  }
  // Method to check if the request path starts with
  // This will help prevent situations where the my-domain.comtaskscreate request looks like this: my-domain.comtaskscreate
  checkPath(path) {
    if (!path.startsWith("/")) {
      throw Error("Путь должен начинаться с /", path);
    }
  }

  async get(path, options) {
    this.checkPath(path);
    return this.httpProvider.get(path, this.buildRequest(options));
  }

  async post(path, options) {
    this.checkPath(path);
    return this.httpProvider.post(path, this.buildRequest(options));
  }

  async put(path, options) {
    this.checkPath(path);
    return this.httpProvider.put(path, this.buildRequest(options));
  }

  async delete(path, options) {
    this.checkPath(path);
    return this.httpProvider.delete(path, this.buildRequest(options));
  }
}
