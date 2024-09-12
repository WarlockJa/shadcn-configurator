import { IColorState } from "@/components/configurator/settings";

const localStorageItem = "shadcn-config";

export const getLocalStorageData = (): IColorState | null => {
  try {
    // @ts-expect-error
    return JSON.parse(localStorage.getItem(localStorageItem));
  } catch (error) {
    return null;
  }
};

export const setLocalStorageData = (data: IColorState | undefined) => {
  try {
    data && localStorage.setItem(localStorageItem, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
