import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
//atom
export const loginState = atom<string>({
  key: "loginState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
