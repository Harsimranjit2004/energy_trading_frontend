import Head from "next/head";
import Image from "next/image";
import NftBox from "../components/NftBox";
import styles from "../styles/Home.module.css";
import { useConnectionStatus } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
export default function Home() {
  const connectionStatus = useConnectionStatus();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/nft")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
      <div className="flex flex-wrap">
        {connectionStatus === "connected" ? (
          loading ? (
            <div> Loading....</div>
          ) : (
            data?.map((nft) => (
              // console.log(nft.tokenId)
              <NftBox
                tokenId={nft.tokenId}
                address={nft.address}
                tokenUri={nft.tokenUri}
                createdAt={nft.created_At}
                key={nft.tokenId}
              />
            ))
          )
        ) : (
          <div>not connected</div>
        )}
      </div>
    </div>
  );
}
