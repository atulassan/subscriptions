function withLoading(Component) {
  return function EnhancedComponent({ loading, ...props }) {
    if (loading) return <p>Loading...</p>;
    return <Component {...props} />;
  };
}

export default withLoading;