const getUsername = async () => {
  const args = process.argv.slice(2);
  const argUsername = args.find((arg) => arg.startsWith("--username="));
  return argUsername ? argUsername.split("=")[1] : "Guest";
};

export default await getUsername();
