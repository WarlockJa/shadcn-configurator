import { schemaIConfiguratorState } from "@/components/configurator/schema";
import { IConfiguratorState } from "@/components/configurator/settings";

const localStorageItem = "shadcn-config";

export const getLocalStorageData = (): IConfiguratorState | null => {
  try {
    const data = schemaIConfiguratorState.parse(
      // @ts-expect-error localStorage value may be not an object
      JSON.parse(localStorage.getItem(localStorageItem)),
    );
    console.log(data.draggableElementsData);
    return data;
  } catch (error) {
    return null;
  }
};

export const setLocalStorageData = (data: IConfiguratorState | undefined) => {
  try {
    data && localStorage.setItem(localStorageItem, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
