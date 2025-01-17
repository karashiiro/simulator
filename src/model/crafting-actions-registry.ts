import { CraftingAction } from './actions/crafting-action';
import { BasicSynthesis } from './actions/progression/basic-synthesis';
import { StandardSynthesis } from './actions/progression/standard-synthesis';
import { CarefulSynthesis } from './actions/progression/careful-synthesis';
import { CarefulSynthesisII } from './actions/progression/careful-synthesis-ii';
import { CarefulSynthesisIII } from './actions/progression/careful-synthesis-iii';
import { FlawlessSynthesis } from './actions/progression/flawless-synthesis';
import { PieceByPiece } from './actions/progression/piece-by-piece';
import { RapidSynthesis } from './actions/progression/rapid-synthesis';
import { RapidSynthesisII } from './actions/progression/rapid-synthesis-ii';
import { FocusedSynthesis } from './actions/progression/focused-synthesis';
import { MuscleMemory } from './actions/progression/muscle-memory';
import { BasicTouch } from './actions/quality/basic-touch';
import { StandardTouch } from './actions/quality/standard-touch';
import { AdvancedTouch } from './actions/quality/advanced-touch';
import { ActionType } from './actions/action-type';
import { HastyTouch } from './actions/quality/hasty-touch';
import { HastyTouchII } from './actions/quality/hasty-touch-ii';
import { ByregotsBlessing } from './actions/quality/byregots-blessing';
import { PreciseTouch } from './actions/quality/precise-touch';
import { FocusedTouch } from './actions/quality/focused-touch';
import { PatientTouch } from './actions/quality/patient-touch';
import { PrudentTouch } from './actions/quality/prudent-touch';
import { ComfortZone } from './actions/buff/comfort-zone';
import { Rumination } from './actions/other/rumination';
import { TricksOfTheTrade } from './actions/other/tricks-of-the-trade';
import { MastersMend } from './actions/other/masters-mend';
import { MastersMendII } from './actions/other/masters-mend-ii';
import { Manipulation } from './actions/buff/manipulation';
import { ManipulationII } from './actions/buff/manipulation-ii';
import { InnerQuiet } from './actions/buff/inner-quiet';
import { SteadyHandII } from './actions/buff/steady-hand-ii';
import { SteadyHand } from './actions/buff/steady-hand';
import { Ingenuity } from './actions/buff/ingenuity';
import { GreatStrides } from './actions/buff/great-strides';
import { Innovation } from './actions/buff/innovation';
import { MakersMark } from './actions/buff/makers-mark';
import { InitialPreparations } from './actions/buff/initial-preparations';
import { InnovativeTouch } from './actions/quality/innovative-touch';
import { SpecialtyRefurbish } from './actions/other/specialty-refurbish';
import { SpecialtyReinforce } from './actions/other/specialty-reinforce';
import { SpecialtyReflect } from './actions/other/specialty-reflect';
import { Observe } from './actions/other/observe';
import { ByregotsMiracle } from './actions/quality/byregots-miracle';
import { WhistleWhileYouWork } from './actions/buff/whistle-while-you-work';
import { Satisfaction } from './actions/other/satisfaction';
import { NymeiasWheel } from './actions/other/nymeias-wheel';
import { TrainedHand } from './actions/other/trained-hand';
import { HeartOfTheCrafter } from './actions/buff/heart-of-the-crafter';
import { WasteNot } from './actions/buff/waste-not';
import { WasteNotII } from './actions/buff/waste-not-ii';
import { IngenuityII } from './actions/buff/ingenuity-ii';
import { Reclaim } from './actions/buff/reclaim';
import { BrandOfTheElements } from './actions/progression/brand-of-the-elements';
import { NameOfTheElements } from './actions/buff/name-of-the-elements';
import { TrainedEye } from './actions/quality/trained-eye';
import { TrainedInstinct } from './actions/quality/trained-instinct';
import { PreparatoryTouch } from './actions/quality/preparatory-touch';
import { RapidSynthesisIII } from './actions/progression/rapid-synthesis-iii';
import { IntensiveSynthesis } from './actions/progression/intensive-synthesis';
import { DelicateSynthesis } from './actions/other/delicate-synthesis';
import { Reuse } from './actions/buff/reuse';

export class CraftingActionsRegistry {
  private static ACTION_IMPORT_NAMES: { short: string; full: string }[] = [
    { short: 'observe', full: 'Observe' },
    { short: 'basicSynth', full: 'BasicSynthesis' },
    { short: 'standardSynthesis', full: 'StandardSynthesis' },
    { short: 'carefulSynthesis', full: 'CarefulSynthesis' },
    { short: 'carefulSynthesis2', full: 'CarefulSynthesisII' },
    { short: 'rapidSynthesis', full: 'RapidSynthesis' },
    { short: 'flawlessSynthesis', full: 'FlawlessSynthesis' },
    { short: 'pieceByPiece', full: 'PieceByPiece' },
    { short: 'basicTouch', full: 'BasicTouch' },
    { short: 'standardTouch', full: 'StandardTouch' },
    { short: 'advancedTouch', full: 'AdvancedTouch' },
    { short: 'hastyTouch', full: 'HastyTouch' },
    { short: 'byregotsBlessing', full: 'ByregotsBlessing' },
    { short: 'mastersMend', full: 'MastersMend' },
    { short: 'mastersMend2', full: 'MastersMendII' },
    { short: 'rumination', full: 'Rumination' },
    { short: 'tricksOfTheTrade', full: 'TricksOfTheTrade' },
    { short: 'innerQuiet', full: 'InnerQuiet' },
    { short: 'manipulation', full: 'Manipulation' },
    { short: 'comfortZone', full: 'ComfortZone' },
    { short: 'steadyHand', full: 'SteadyHand' },
    { short: 'steadyHand2', full: 'SteadyHandII' },
    { short: 'wasteNot', full: 'WasteNot' },
    { short: 'wasteNot2', full: 'WasteNotII' },
    { short: 'innovation', full: 'Innovation' },
    { short: 'greatStrides', full: 'GreatStrides' },
    { short: 'ingenuity', full: 'Ingenuity' },
    { short: 'ingenuity2', full: 'IngenuityII' },
    { short: 'byregotsBrow', full: 'ByregotsBrow' },
    { short: 'preciseTouch', full: 'PreciseTouch' },
    { short: 'makersMark', full: 'MakersMark' },
    { short: 'muscleMemory', full: 'MuscleMemory' },
    { short: 'whistle', full: 'WhistleWhileYouWork' },
    { short: 'satisfaction', full: 'Satisfaction' },
    { short: 'innovativeTouch', full: 'InnovativeTouch' },
    { short: 'nymeiasWheel', full: 'NymeiasWheel' },
    { short: 'byregotsMiracle', full: 'ByregotsMiracle' },
    { short: 'trainedHand', full: 'TrainedHand' },
    { short: 'brandOfEarth', full: 'BrandOfTheElements' },
    { short: 'brandOfFire', full: 'BrandOfTheElements' },
    { short: 'brandOfIce', full: 'BrandOfTheElements' },
    { short: 'brandOfLightning', full: 'BrandOfTheElements' },
    { short: 'brandOfWater', full: 'BrandOfTheElements' },
    { short: 'brandOfWind', full: 'BrandOfTheElements' },
    { short: 'nameOfEarth', full: 'NameOfTheElements' },
    { short: 'nameOfFire', full: 'NameOfTheElements' },
    { short: 'nameOfIce', full: 'NameOfTheElements' },
    { short: 'nameOfLightning', full: 'NameOfTheElements' },
    { short: 'nameOfWater', full: 'NameOfTheElements' },
    { short: 'nameOfWind', full: 'NameOfTheElements' },
    { short: 'hastyTouch2', full: 'HastyTouchII' },
    { short: 'carefulSynthesis3', full: 'CarefulSynthesisIII' },
    { short: 'rapidSynthesis2', full: 'RapidSynthesisII' },
    { short: 'patientTouch', full: 'PatientTouch' },
    { short: 'manipulation2', full: 'ManipulationII' },
    { short: 'prudentTouch', full: 'PrudentTouch' },
    { short: 'focusedSynthesis', full: 'FocusedSynthesis' },
    { short: 'focusedTouch', full: 'FocusedTouch' },
    { short: 'initialPreparations', full: 'InitialPreparations' },
    { short: 'specialtyReinforce', full: 'SpecialtyReinforce' },
    { short: 'specialtyRefurbish', full: 'SpecialtyRefurbish' },
    { short: 'specialtyReflect', full: 'SpecialtyReflect' },
    { short: 'strokeOfGenius', full: 'StrokeOfGenius' },
    { short: 'finishingTouches', full: 'FinishingTouches' },
    { short: 'reclaim', full: 'Reclaim' }
  ];

  public static readonly ALL_ACTIONS: { name: string; action: CraftingAction }[] = [
    // Progress actions
    { name: 'BasicSynthesis', action: new BasicSynthesis() },
    { name: 'StandardSynthesis', action: new StandardSynthesis() },
    { name: 'FlawlessSynthesis', action: new FlawlessSynthesis() },
    { name: 'CarefulSynthesis', action: new CarefulSynthesis() },
    { name: 'CarefulSynthesisII', action: new CarefulSynthesisII() },
    { name: 'CarefulSynthesisIII', action: new CarefulSynthesisIII() },
    { name: 'PieceByPiece', action: new PieceByPiece() },
    { name: 'RapidSynthesis', action: new RapidSynthesis() },
    { name: 'RapidSynthesisII', action: new RapidSynthesisII() },
    { name: 'RapidSynthesisIII', action: new RapidSynthesisIII() },
    { name: 'FocusedSynthesis', action: new FocusedSynthesis() },
    { name: 'MuscleMemory', action: new MuscleMemory() },
    { name: 'BrandOfTheElements', action: new BrandOfTheElements() },
    { name: 'IntensiveSynthesis', action: new IntensiveSynthesis() },

    // Quality actions
    { name: 'BasicTouch', action: new BasicTouch() },
    { name: 'StandardTouch', action: new StandardTouch() },
    { name: 'AdvancedTouch', action: new AdvancedTouch() },
    { name: 'HastyTouch', action: new HastyTouch() },
    { name: 'HastyTouchII', action: new HastyTouchII() },
    { name: 'ByregotsBlessing', action: new ByregotsBlessing() },
    { name: 'ByregotsMiracle', action: new ByregotsMiracle() },
    { name: 'PreciseTouch', action: new PreciseTouch() },
    { name: 'FocusedTouch', action: new FocusedTouch() },
    { name: 'PatientTouch', action: new PatientTouch() },
    { name: 'PrudentTouch', action: new PrudentTouch() },
    { name: 'InnovativeTouch', action: new InnovativeTouch() },
    { name: 'TrainedEye', action: new TrainedEye() },
    { name: 'TrainedInstinct', action: new TrainedInstinct() },
    { name: 'PreparatoryTouch', action: new PreparatoryTouch() },

    // CP recovery
    { name: 'ComfortZone', action: new ComfortZone() },
    { name: 'Rumination', action: new Rumination() },
    { name: 'TricksOfTheTrade', action: new TricksOfTheTrade() },
    { name: 'Satisfaction', action: new Satisfaction() },

    // Repair
    { name: 'MastersMend', action: new MastersMend() },
    { name: 'MastersMendII', action: new MastersMendII() },
    { name: 'Manipulation', action: new Manipulation() },
    { name: 'ManipulationII', action: new ManipulationII() },
    { name: 'NymeiasWheel', action: new NymeiasWheel() },

    // Buffs
    { name: 'InnerQuiet', action: new InnerQuiet() },
    { name: 'SteadyHand', action: new SteadyHand() },
    { name: 'SteadyHandII', action: new SteadyHandII() },
    { name: 'WasteNot', action: new WasteNot() },
    { name: 'WasteNotII', action: new WasteNotII() },
    { name: 'Ingenuity', action: new Ingenuity() },
    { name: 'IngenuityII', action: new IngenuityII() },
    { name: 'GreatStrides', action: new GreatStrides() },
    { name: 'Innovation', action: new Innovation() },
    { name: 'MakersMark', action: new MakersMark() },
    { name: 'InitialPreparations', action: new InitialPreparations() },
    { name: 'WhistleWhileYouWork', action: new WhistleWhileYouWork() },
    { name: 'HeartOfTheCrafter', action: new HeartOfTheCrafter() },
    { name: 'NameOfTheElements', action: new NameOfTheElements() },

    // Specialties
    { name: 'SpecialtyRefurbish', action: new SpecialtyRefurbish() },
    { name: 'SpecialtyReinforce', action: new SpecialtyReinforce() },
    { name: 'SpecialtyReflect', action: new SpecialtyReflect() },

    // Other
    { name: 'Observe', action: new Observe() },
    { name: 'TrainedHand', action: new TrainedHand() },
    { name: 'DelicateSynthesis', action: new DelicateSynthesis() },
    { name: 'Reclaim', action: new Reclaim() },
    { name: 'Reuse', action: new Reuse() }
  ];

  public static getActionsByType(type: ActionType): CraftingAction[] {
    return CraftingActionsRegistry.ALL_ACTIONS.filter(row => row.action.getType() === type).map(
      row => row.action
    );
  }

  public static importFromCraftOpt(importArray: string[]): CraftingAction[] {
    return importArray
      .map(row => {
        const found = CraftingActionsRegistry.ACTION_IMPORT_NAMES.find(
          action => action.short === row
        );
        if (found === undefined) {
          return undefined;
        }
        return CraftingActionsRegistry.ALL_ACTIONS.find(el => {
          return el.name === found.full;
        });
      })
      .filter(action => action !== undefined)
      .map((row: any) => row.action);
  }

  public static exportToCraftOpt(actionNames: string[]): string {
    return JSON.stringify(
      actionNames
        .map(actionName => {
          return CraftingActionsRegistry.ACTION_IMPORT_NAMES.find(el => {
            return el.full === actionName;
          });
        })
        .filter(action => action !== undefined)
        .map((row: any) => row.short)
    );
  }

  public static createFromIds(ids: number[]): CraftingAction[] {
    return ids
      .map(id => {
        const found = CraftingActionsRegistry.ALL_ACTIONS.find(
          row => row.action.getIds().indexOf(id) > -1
        );
        if (found !== undefined) {
          return found.action;
        }
        return undefined;
      })
      .filter(action => action !== undefined) as CraftingAction[];
  }

  public static serializeRotation(rotation: CraftingAction[]): string[] {
    return rotation
      .map(action => {
        const actionRow = CraftingActionsRegistry.ALL_ACTIONS.find(row => row.action === action);
        if (actionRow !== undefined) {
          return actionRow.name;
        }
        return undefined;
      })
      .filter(action => action !== undefined) as string[];
  }

  public static deserializeRotation(rotation: string[]): CraftingAction[] {
    return rotation
      .map(actionName => CraftingActionsRegistry.ALL_ACTIONS.find(row => row.name === actionName))
      .filter(action => action !== undefined)
      .map((row: any) => row.action);
  }
}
