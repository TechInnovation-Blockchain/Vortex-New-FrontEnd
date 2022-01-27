import { useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { InputText } from "./index";
import UmaIcon from "../assets/images/icons/UMA.webp";

const TokenSection = ({
  selectedTokenList,
  selectedTokenListDefault,
  setSelectedTokenList,
  tokenArr,
  setTokenArr,
  tokenAddress,
  handleTokenAddressChange,
  tokenResponse,
  minRewardRatio,
  setMinRewardRatio,
  addToken,
  addTokenError,
  smallFont,
  classes,
  quantity,
  setQuantity,
}) => {
  console.log("tokenArr", tokenArr);

  useEffect(() => {
    if (selectedTokenListDefault && tokenArr.length > 0) {
      const token_names = tokenArr.map((token) => token.token_name);
      const min_reward_ratios = tokenArr.map((token) => Number(token.min_reward_ratio));
      console.log({ token_names, min_reward_ratios });
      setSelectedTokenList([...selectedTokenListDefault, ...token_names]);

      const default_min_reward_ratios = selectedTokenListDefault.map(() => 0.1);

      setQuantity([...default_min_reward_ratios, ...min_reward_ratios]);
      // setMinRewardRatio(token.min_reward_ratio);
    }
  }, [tokenArr, tokenAddress]);

  // {
  //   "token_address": "0x3adabebc498812a68533452a82fa1f4dcf6531c9",
  //   "token_name": "Uniswap V2",
  //   "min_reward_ratio": "0.1"
  // }

  const AddButton = ({ onClick }) => (
    <div
      className="d-flex align-self-center justify-content-center flex-column"
      style={{
        borderRadius: "100%",
        border: "1px solid #707070",
        padding: "8px",
        cursor: "pointer",
      }}
      onClick={onClick}
      onKeyPress={() => {}}
      tabIndex={0}
      role="button"
    >
      <AddIcon style={{ fontSize: "25px" }} />
    </div>
  );

  return (
    <>
      {tokenArr.length > 0 && (
        <div className="col-12 px-0 px-md-2 mb-4 fontResize">
          <div className="d-flex justify-content-between ">
            <div
              style={{
                // width: "215px",
                overflowX: "auto",
              }}
            >
              <span className="text-center">
                <b>Reward Tokens</b>
              </span>
              {tokenArr.map((token) => (
                <p className="p-0 m-0" key={token.token_name}>
                  {/* <span>{shortenAddress(token.token_address)}</span> */}
                  <span>
                    <img
                      src={UmaIcon}
                      alt="icon"
                      height="15"
                      style={{ marginRight: "5px" }}
                    />
                    {token.token_name}
                  </span>
                </p>
              ))}
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span>
                  <b>Min Reward Ratio</b>
                </span>
                {tokenArr.map((token) => (
                  <p className="text-center p-0 m-0" key={token.token_name}>
                    <span>{token.min_reward_ratio}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="">
              <span>
                <b>&nbsp;</b>
              </span>
              {tokenArr.map((token) => (
                <p className="text-center p-0 m-0" key={token.token_name}>
                  <DeleteIcon
                    onClick={() =>
                      setTokenArr([
                        ...tokenArr.filter(
                          (t) => token.token_name !== t.token_name
                        ),
                      ])
                    }
                    color="secondary"
                    className={classes.deleteBtn}
                  />
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="col-12 px-0 px-md-2 mb-4">
        <div className={classes.tokenAddressGroup}>
          <div className="row">
            <div className="col-10">
              <div className="row">
                <div className="col-12 mb-4">
                  <InputText
                    className="h-100"
                    label="Token Address"
                    value={tokenAddress}
                    onChange={handleTokenAddressChange}
                    fontSize={smallFont}
                    marginSm
                  />
                </div>
                <div
                  className="col-6 text-center flex align-center"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {tokenResponse.length > 0 && (
                    <p
                      style={{
                        color: "white",
                        fontSize: "13px",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        marginTop: 0,
                      }}
                      className="fontResize"
                    >
                      {!tokenResponse.startsWith("invalid") &&
                        !tokenResponse.startsWith("empty") && (
                          <img
                            src={UmaIcon}
                            alt="icon"
                            height="15"
                            style={{ marginRight: "5px" }}
                          />
                        )}
                      {tokenResponse}
                    </p>
                  )}
                </div>
                <div className="col-6">
                  <InputText
                    className="h-100"
                    type="number"
                    label="Min Ratio"
                    value={minRewardRatio}
                    onChange={setMinRewardRatio}
                    tooltip="The minimum reward ratio is the minimum reward per block to ensure the rewards deposited per block doesn't fall below this value / sufficient reward tokens are deposited. The value must be an integer with no decimals.
                                Example: if the minimum reward ratio is 1, you can add 100 tokens for 100 blocks but you cannot add 99 tokens for 100 blocks because it will fall below 1."
                    marginSm
                  />
                </div>
              </div>
            </div>

            <div className="col-2 px-0 px-md-2  d-flex ">
              <AddButton onClick={() => addToken()} />
            </div>

            <div className="col-12">
              {addTokenError && (
                <>
                  <p style={{ color: "tomato", fontSize: "10px" }}>
                    {addTokenError}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenSection;
