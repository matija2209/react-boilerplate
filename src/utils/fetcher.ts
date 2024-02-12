type FetchFunction<T = any, A = any> = (...args: A[]) => Promise<T>;

// Higher-order function to create a fetcher
const createFetcher = <T, A>(fetchFunction: FetchFunction<T, A>) => {
  return (key: string) => fetchFunction(key as unknown as A).then((res) => res);
};

export default createFetcher;
