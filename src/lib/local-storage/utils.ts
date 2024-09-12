import { schemaIColorState } from "@/components/configurator/schema";
import { IColorState } from "@/components/configurator/settings";

const localStorageItem = "shadcn-config";

export const getLocalStorageData = (): IColorState | null => {
  try {
    const data = schemaIColorState.parse(
      // @ts-expect-error localStorage value may be not an object
      JSON.parse(localStorage.getItem(localStorageItem)),
    );
    console.log("DATA:", data);
    return data;
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
