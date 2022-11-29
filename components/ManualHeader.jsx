import { useMoralis } from "react-moralis";
import { useEffect } from "react"; //if refreshed stil connected to wallet

export default function ManualHeader() {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis(); // is called hooks

  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
    // enableWeb3;
  }, [isWeb3Enabled]); //takes 2 param 1.func as its 1st and 2. it optionally takes dependency array
  // it runs twice because of strict mode

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account Changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null account found");
      }
    });
  }, []);

  return (
    <div>
      {account ? (
        <div>Connected to {account}</div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== "undefined") {
              window.localStorage.setItem("connected", "injected"); //
            }
          }}
          disabled={isWeb3EnableLoading} // if connected the connect button is gone
        >
          Connect
        </button>
      )}
    </div>
  );
}
