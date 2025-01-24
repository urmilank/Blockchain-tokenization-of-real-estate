export default async function getCurrentAccount() {
  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Set the first account
    return accounts[0];
  } catch (err) {
    console.error(err);
  }
}
