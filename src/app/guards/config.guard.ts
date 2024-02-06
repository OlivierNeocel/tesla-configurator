import {LocalStorageService, SELECTED_MODEL_KEY} from "../services/local-storage.service";
import {inject} from "@angular/core";

export const ConfigGuard = (): boolean => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  return localStorageService.getItem(SELECTED_MODEL_KEY) !== null
    && localStorageService.getItem(SELECTED_MODEL_KEY) !== null;
}
