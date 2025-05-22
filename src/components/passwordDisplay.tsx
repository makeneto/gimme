import { useEffect, useState } from "react";
import styled from "styled-components";
import { Copy, RefreshCw, UserLock } from "lucide-react";
import { generateSmartPassword } from "../utils/passwordGenerator";

const Display = styled.section`
  max-width: 90%;
  margin-inline: auto;
  display: grid;
  gap: 2rem;

  & h1 {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    width: fit-content;
    font-size: 1.7rem;
    font-weight: 500;
    color: #f21313;
    font-family: "Cal Sans", sans-serif;

    & svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    max-width: 100%;
    gap: 1.5rem;
  }

  @media (max-width: 1280px) {
    gap: 1.5rem;
  }
`;

const Container = styled.div`
  margin-top: -1rem;
`;

const PasswordPlace = styled.div`
  background-color: #fff;
  border-radius: 1.1rem 1.1rem 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 1.6rem 2.5rem;

  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  column-gap: 0.5rem;

  & p {
    font-size: 2rem;
    font-weight: 400;
    color: #000;
    margin: 0;
    overflow-x: auto;
    white-space: nowrap;
    padding: 0.3rem 0.7rem;
    border-radius: 0.4rem;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 480px) {
      font-size: 1.4rem;
    }

    @media (max-width: 1280px) {
      font-size: 1.5rem;
    }
  }

  & div {
    display: flex;
    gap: 1rem;

    & svg {
      width: 1.8rem;
      height: 1.8rem;
      cursor: pointer;
      color: #696969;
      transition: all 0.3s ease-in;

      @media (max-width: 480px) {
        width: 1.3rem;
        height: 1.3rem;
      }

      @media (max-width: 1280px) {
        width: 1.4rem;
        height: 1.4rem;
      }
    }

    & svg:last-child:hover {
      transform: rotate(80deg);
    }

    @media (max-width: 480px) {
      gap: 1rem;
    }
  }

  @media (max-width: 480px) {
    column-gap: 0.7rem;
    padding: 0.7rem 1rem;
  }

  @media (max-width: 1280px) {
    padding: 1rem 1.5rem;
  }
`;

const Progress = styled.div`
  width: 100%;
  height: 0.6rem;
  background-color: #eee;
  border-radius: 0 0 0.3rem 0.3rem;
  overflow: hidden;

  & div {
    height: 100%;
    border-radius: 0 0.3rem 0.3rem;
    transition: width 0.6s ease-in-out;
  }

  @media (max-width: 480px) {
    height: 0.5rem;
  }

  @media (max-width: 1280px) {
    height: 0.4rem;
  }
`;

const Controls = styled.div`
  display: grid;
  background-color: #fff;
  padding: 1.6rem 2.5rem 2.5rem;
  border-radius: 0.3rem 0.3rem 1.2rem 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  h2 {
    font-size: 1.2rem;
    font-weight: 400;
    font-weight: 600;
    color: #000;
    margin: 0;

    border-bottom: 1px solid #eeeeee94;
    padding-bottom: 0.6rem;
    margin-bottom: 1rem;

    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }

  & aside {
    display: grid;
    gap: 3rem;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 1.3rem 1.5rem 2rem;
  }

  @media (max-width: 1280px) {
    padding: 1.6rem 2.4rem 2.5rem;
  }
`;

const InputControls = styled.div`
  display: grid;

  & div {
    display: flex;
    gap: 1rem;
    align-items: center;

    & input[type="number"] {
      width: 9%;
      height: 2.5rem;
      border-radius: 0.3rem;
      border: none;
      padding-left: 1rem;
      background-color: #f5f5f5;
      font-size: 1.2rem;
      color: #000;
      outline: none;

      @media (max-width: 480px) {
        width: 22% !important;
      }

      @media (max-width: 1280px) {
        width: 7%;
      }
    }

    & input[type="range"] {
      width: 29%;
      height: 9px;
      appearance: none;
      background: #dddddd8f;
      border-radius: 10px;
      outline: none;

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        background: #f21313;
        border-radius: 50%;
        cursor: pointer;

        @media (max-width: 480px) {
          width: 1.4rem;
          height: 1.4rem;
        }

        @media (max-width: 1280px) {
          width: 1.2rem;
          height: 1.2rem;
        }
      }

      @media (max-width: 480px) {
        width: 100% !important;
        height: 0.5rem !important;
      }

      @media (max-width: 1280px) {
        width: 30%;
        height: 7px;
      }
    }
  }
`;

const CopyPasswordButton = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #f21313;
  cursor: pointer;
  transition: all 0.2s ease-in;

  &:hover {
    background-color: #ba1010;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 55% !important;
    margin: auto !important;
  }

  @media (max-width: 884px) {
    width: 31%;
    margin: auto;
  }
`;

// const Logo = styled.a`
//   width: 100%;
//   margin: 3rem 0 2rem;
//   display: flex;
//   justify-content: center;
//   color: var(--dark-green);
//   font-size: 1.2rem;
//   text-decoration: none;
//   font-weight: bolder;
//   cursor: pointer;

//   & span {
//     text-align: center;
//     border-right: 0.4rem solid #63a1f2;
//   }

//   @media (max-width: 480px) {
//     font-size: 1rem;
//     margin: 2rem 0;
//   }
// `;

export default function PasswordDisplay() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [securityLevel, setSecurityLevel] = useState("");
  const [progressWidth, setProgressWidth] = useState("0%");
  const [copied, setCopied] = useState(false);

  const [upperCase, setUpperCase] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(true);

  useEffect(() => {
    generateSmartPassword(
      passwordLength,
      upperCase,
      lowerCase,
      number,
      symbol
    ).then(setPassword);
  }, [passwordLength, upperCase, lowerCase, number, symbol]);

  const handleGenerate = () => {
    generateSmartPassword(
      passwordLength,
      upperCase,
      lowerCase,
      number,
      symbol
    ).then(setPassword);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);

      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  useEffect(() => {
    if (passwordLength < 4) {
      setSecurityLevel("transparent");
      setProgressWidth("0%");
    } else if (passwordLength < 7) {
      setSecurityLevel("#DF6661");
      setProgressWidth("25%");
    } else if (passwordLength < 9) {
      setSecurityLevel("#F6B93B");
      setProgressWidth("50%");
    } else if (passwordLength < 11) {
      setSecurityLevel("#00A878");
      setProgressWidth("75%");
    } else {
      setSecurityLevel("#006B4D");
      setProgressWidth("100%");
    }
  }, [passwordLength]);

  return (
    <>
      <Display>
        <h1>
          <UserLock /> Gimme
        </h1>
        <Container>
          <PasswordPlace>
            <p>{password}</p>

            <div>
              <Copy onClick={handleCopy} />
              <RefreshCw onClick={handleGenerate} />
            </div>
          </PasswordPlace>

          <Progress>
            <div
              style={{
                backgroundColor: securityLevel,
                width: progressWidth,
              }}
            ></div>
          </Progress>
        </Container>

        <Controls>
          <h2>Customize your password</h2>

          <aside>
            <section>
              <InputControls>
                <p>Number of characters</p>
                <div>
                  <input
                    type="number"
                    name=""
                    id=""
                    min="2"
                    max="50"
                    value={passwordLength}
                    onChange={(e) => setPasswordLength(Number(e.target.value))}
                  />
                  <input
                    type="range"
                    value={passwordLength}
                    min="2"
                    max="50"
                    onChange={(e) => setPasswordLength(Number(e.target.value))}
                  />
                </div>
              </InputControls>
            </section>

            <section>
              <div className="check__controls">
                <div>
                  <label className="container">
                    <input
                      checked={upperCase}
                      type="checkbox"
                      onChange={(e) => setUpperCase(e.target.checked)}
                    />
                    <div className="checkmark"></div>
                    <p>Uppercase letters</p>
                  </label>
                  <label className="container">
                    <input
                      checked={lowerCase}
                      type="checkbox"
                      onChange={(e) => setLowerCase(e.target.checked)}
                    />
                    <div className="checkmark"></div>
                    <p>Lowercase letters</p>
                  </label>
                </div>

                <div>
                  <label className="container">
                    <input
                      checked={number}
                      type="checkbox"
                      onChange={(e) => setNumber(e.target.checked)}
                    />
                    <div className="checkmark"></div>
                    <p>Numbers</p>
                  </label>
                  <label className="container">
                    <input
                      checked={symbol}
                      type="checkbox"
                      onChange={(e) => setSymbol(e.target.checked)}
                    />
                    <div className="checkmark"></div>
                    <p>Symbols</p>
                  </label>
                </div>
              </div>
            </section>
          </aside>
        </Controls>

        <CopyPasswordButton onClick={handleCopy} disabled={copied}>
          {copied ? "Copied" : "Copy password"}
        </CopyPasswordButton>
      </Display>

      {/* <footer>
        <Logo
          translate="no"
          href="https://makenedev.vercel.app"
          target="_blank"
        >
          <span>makenedev</span>
        </Logo>
      </footer> */}
    </>
  );
}
