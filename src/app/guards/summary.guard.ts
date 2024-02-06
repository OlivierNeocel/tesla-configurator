import {LocalStorageService, SELECTED_CONFIG_KEY} from "../services/local-storage.service";
import {inject} from "@angular/core";

export const SummaryGuard = (): boolean => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  return localStorageService.getItem(SELECTED_CONFIG_KEY) !== null;
}
