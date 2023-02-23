const AuthLayout = ({ children }) => {
  return (
    <main className="bg-mercury relative inset-0">
      <main className="container mx-auto">{children}</main>
    </main>
  );
};

export default AuthLayout;
