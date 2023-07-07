import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

const useTypedStoreAction = () => {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const useAppDispatch = () => useDispatch<AppDispatch>();
  const dispatch = useAppDispatch();

  return { dispatch, useAppSelector };
};

export default useTypedStoreAction;
