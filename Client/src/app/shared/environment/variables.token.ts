import { InjectionToken } from "@angular/core";
import { IEnvironmentVariables } from "./IEnv.variables";

export let EnvVariables = new InjectionToken<IEnvironmentVariables>("Variables");