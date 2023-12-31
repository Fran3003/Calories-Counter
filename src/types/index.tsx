export type RootStackParams = {
    Home: undefined;
    AddFood: undefined;
  };
  
  export type AddFoodModalProps = {
    onClose: (shouldUpdate?: boolean) => void;
    isOpen: boolean;
  };
  
  export type Meal = {
    calories: string;
    name: string;
    portion: string;
    date?: string;
  };