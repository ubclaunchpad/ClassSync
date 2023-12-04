import { useEffect, useState } from "react";

const useVerificationHook = (codeLength) => {
  const initialInputStates = Array.from({ length: codeLength }, () => "");
  const [inputStates, setInputStates] = useState(initialInputStates);

  let [code, setCode] = useState(null);

  let inputClass = "confirmation-input-child";

  const updateInputState = (index, value) => {
    setInputStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = value;

      console.log(newStates);

      return newStates;
    });
  };

  const handleChange = (e, index) => {
    let entry = e.target.value;

    // Check digit <= 1 and is a number
    if (entry.length <= 1 && !Number.isNaN(entry)) {
      // Save the individual digit
      updateInputState(index, entry);

      if (entry.length === 1) {
        if (index < codeLength - 1) {
          let nextInput = document.querySelectorAll(`.${inputClass}`)[
            index + 1
          ];
          if (nextInput.value === "") {
            nextInput.focus();
          }
        }
      } else if (entry.length === 0) {
        let prevInput = document.querySelectorAll(`.${inputClass}`)[index - 1];

        if (prevInput !== undefined) {
          prevInput.focus();
        }
      }
    } else {
      return;
    }
  };

  // Check for values that aren't numbers but JS considers numbers
  const handleKeyDown = (e) => {
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();
  };

  // Join the individual digits together
  useEffect(() => {
    let finalCode = inputStates.join("");
    console.log(`finalCode: ${finalCode}`);

    if (finalCode.length === codeLength) {
      setCode(finalCode);
    } else {
      setCode(null);
    }
  }, [inputStates, codeLength]);

  return {
    code,
    inputStates,
    inputClass,
    handleChange,
    handleKeyDown,
  };
};

export default useVerificationHook;
