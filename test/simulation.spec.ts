import { SteadyHandII } from '../src/model/actions/buff/steady-hand-ii'
import { BasicTouch } from '../src/model/actions/quality/basic-touch'
import { Simulation } from '../src/simulation/simulation'
import { BasicSynthesis } from '../src/model/actions/progression/basic-synthesis'
import { SteadyHand } from '../src/model/actions/buff/steady-hand'
import { InnerQuiet } from '../src/model/actions/buff/inner-quiet'
import { Buff } from '../src/model/buff.enum'
import { Manipulation } from '../src/model/actions/buff/manipulation'
import { ManipulationII } from '../src/model/actions/buff/manipulation-ii'
import { WasteNot } from '../src/model/actions/buff/waste-not'
import { WasteNotII } from '../src/model/actions/buff/waste-not-ii'
import { Ingenuity } from '../src/model/actions/buff/ingenuity'
import { IngenuityII } from '../src/model/actions/buff/ingenuity-ii'
import { InitialPreparations } from '../src/model/actions/buff/initial-preparations'
import { MakersMark } from '../src/model/actions/buff/makers-mark'
import { FlawlessSynthesis } from '../src/model/actions/progression/flawless-synthesis'
import { Observe } from '../src/model/actions/other/observe'
import { FocusedSynthesis } from '../src/model/actions/progression/focused-synthesis'
import { HastyTouch } from '../src/model/actions/quality/hasty-touch'
import { RapidSynthesisII } from '../src/model/actions/progression/rapid-synthesis-ii'
import { acchan_stats, alc_70_350_stats, gradeII_infusion_of_str_Recipe, infusionOfMind_Recipe } from './mocks'
import { ComfortZone } from '../src/model/actions/buff/comfort-zone'
import { SpecialtyReflect } from '../src/model/actions/other/specialty-reflect'
import { PieceByPiece } from '../src/model/actions/progression/piece-by-piece'
import { PrudentTouch } from '../src/model/actions/quality/prudent-touch'
import { FocusedTouch } from '../src/model/actions/quality/focused-touch'
import { GreatStrides } from '../src/model/actions/buff/great-strides'
import { Innovation } from '../src/model/actions/buff/innovation'
import { ByregotsMiracle } from '../src/model/actions/quality/byregots-miracle'
import { Rumination } from '../src/model/actions/other/rumination'
import { CarefulSynthesisIII } from '../src/model/actions/progression/careful-synthesis-iii'


describe('Craft simulator tests', () => {

  describe('Base tests', () => {
    it('should be able to predict correct progression on action', () => {
      const simulation = new Simulation(infusionOfMind_Recipe, [new SteadyHand(), new BasicSynthesis()], alc_70_350_stats)
      simulation.run()
      expect(simulation.progression).toBeCloseTo(353, 1)
    })

    it('should be able to predict correct progression on action for high level crafts', () => {
      const simulation = new Simulation(gradeII_infusion_of_str_Recipe, [new BasicSynthesis()], acchan_stats)
      simulation.run(true)
      expect(simulation.progression).toBe(237)
    })

    it('should be able to predict correct quality increase on action', () => {
      const simulation = new Simulation(gradeII_infusion_of_str_Recipe, [new BasicTouch()], acchan_stats)
      simulation.run(true)
      expect(simulation.quality).toBe(290)
    })

    it('should apply stroke of genius on specialist craft start', () => {
      const simulation = new Simulation(infusionOfMind_Recipe, [new BasicSynthesis()], alc_70_350_stats)
      simulation.run()
      expect(simulation.availableCP).toBe(489)
      expect(simulation.maxCP).toBe(489)
    })

    it('should remove CP properly on action', () => {
      const simulation = new Simulation(infusionOfMind_Recipe, [new SteadyHand(), new BasicSynthesis()], alc_70_350_stats)
      simulation.run()
      expect(simulation.availableCP).toBe(467)
    })

    it('should take Observe combo into account', () => {
      const results = []
      // Run simulation 10k times, to be sure with probability
      for (let i = 0; i < 10000; i++) {
        const simulation = new Simulation(infusionOfMind_Recipe, [new Observe(), new FocusedSynthesis()], alc_70_350_stats)
        simulation.run()
        results.push(simulation.steps[0].success)
      }
      expect(results.filter(row => !row).length).toBe(0)
    })
  })

  describe('Buffs tests', () => {

    describe('Steady Hands', () => {
      it('should be able to apply steady hand buff properly', () => {
        const results = []
        // Run simulation 10k times, to be sure with probability
        for (let i = 0; i < 10000; i++) {
          const simulation = new Simulation(infusionOfMind_Recipe, [new SteadyHand(), new BasicSynthesis()], alc_70_350_stats)
          simulation.run()
          results.push(simulation.steps[1].success)
        }
        // Expect no failures, as steady hand ensures 100% success with a 90% skill.
        expect(results.filter(res => !res).length).toBe(0)
      })

      it('should be able to apply steady hand II buff properly', () => {
        const results = []
        // Run simulation 10k times, to be sure with probability
        for (let i = 0; i < 10000; i++) {
          const simulation = new Simulation(infusionOfMind_Recipe, [new SteadyHandII(), new BasicTouch()], alc_70_350_stats)
          simulation.run()
          results.push(simulation.steps[1].success)
        }
        // Expect no failures, as steady hand ensures 100% success with a 90% skill.
        expect(results.filter(res => !res).length).toBe(0)
      })
    })

    describe('Inner Quiet', () => {
      it('should increase Inner Quiet stacks on quality addition', () => {
        const simulation = new Simulation(infusionOfMind_Recipe,
          [new InnerQuiet(), new SteadyHandII(), new BasicTouch()],
          alc_70_350_stats)
        simulation.run(true)
        expect(simulation.getBuff(Buff.INNER_QUIET).stacks).toBe(2)
      })

      it('should affect quality increase properly', () => {
        const simulation = new Simulation(infusionOfMind_Recipe,
          [new InnerQuiet(), new SteadyHandII(), new BasicTouch(), new BasicTouch()],
          alc_70_350_stats)
        simulation.run(true)
        expect(simulation.quality).toBeCloseTo(1262, 1)
      })
    })

    describe('Manipulations', () => {
      it('should repair properly with Manupilation', () => {
        const simulation = new Simulation(infusionOfMind_Recipe,
          [new Manipulation(), new BasicSynthesis(), new BasicSynthesis(), new BasicSynthesis(), new BasicSynthesis()],
          alc_70_350_stats)
        simulation.run()
        expect(simulation.durability).toBe(70)
      })

      it('should repair properly with Manupilation II', () => {
        const simulation = new Simulation(infusionOfMind_Recipe,
          [new ManipulationII(), new BasicSynthesis(), new BasicSynthesis(), new BasicSynthesis()],
          alc_70_350_stats)
        simulation.run()
        expect(simulation.durability).toBe(65)
      })
    })

    describe('Waste nots', () => {
      it('should take waste not into account', () => {
        const simulation = new Simulation(infusionOfMind_Recipe,
          [new WasteNot(), new BasicSynthesis()],
          alc_70_350_stats)
        simulation.run()
        expect(simulation.durability).toBe(75)
      })

      it('should take waste not II into account', () => {
        const simulation = new Simulation(infusionOfMind_Recipe,
          [new WasteNotII(), new BasicSynthesis()],
          alc_70_350_stats)
        simulation.run()
        expect(simulation.durability).toBe(75)
      })
    })

    describe('Ingenuities', () => {
      it('should properly reduce recipe level with Ingenuity, influencing progression', () => {
        const simulation = new Simulation(infusionOfMind_Recipe,
          [new SteadyHand(), new Ingenuity(), new BasicSynthesis()],
          alc_70_350_stats)
        simulation.run()
        expect(simulation.progression).toBe(414)
      })

      it('should properly reduce recipe level with Ingenuity II, influencing progression', () => {
        const simulation = new Simulation(infusionOfMind_Recipe,
          [new SteadyHand(), new IngenuityII(), new BasicSynthesis()],
          alc_70_350_stats)
        simulation.run()
        expect(simulation.progression).toBe(459)
      })
    })

    describe('Maker\'s Mark', () => {
      it('should compute correct stacks amount', () => {
        const simulation = new Simulation(infusionOfMind_Recipe,
          [new MakersMark()],
          alc_70_350_stats)
        simulation.run()
        expect(simulation.getBuff(Buff.MAKERS_MARK).duration).toBe(29)
      })

      it('should affect Flawless Synthesis as it has to', () => {
        const simulation = new Simulation(infusionOfMind_Recipe,
          [new MakersMark(), new SteadyHand(), new FlawlessSynthesis()],
          alc_70_350_stats)
        simulation.run()
        expect(simulation.getBuff(Buff.MAKERS_MARK).duration).toBe(27)
        expect(simulation.progression).toBe(40)
        expect(simulation.availableCP).toBe(447)
        expect(simulation.durability).toBe(80)
      })
    })
  })

  describe('Other tests', () => {

    it('should be able to run in linear mode properly', () => {
      const results = []
      // Run simulation 10k times, to be sure with probability
      for (let i = 0; i < 10000; i++) {
        // Hasty Touch has 50% probability, with linear mode this should never fail.
        const simulation = new Simulation(infusionOfMind_Recipe,
          [new HastyTouch(), new HastyTouch(), new HastyTouch()], alc_70_350_stats)
        simulation.run(true)
        results.push(...simulation.steps.map(step => step.success))
      }
      // Expect no failure at all
      expect(results.filter(res => !res).length).toBe(0)
    })

    it('should be able to provide proper reliability report', () => {
      const simulation = new Simulation(infusionOfMind_Recipe,
        [new RapidSynthesisII(), new RapidSynthesisII(), new RapidSynthesisII()], acchan_stats)
      const report = simulation.getReliabilityReport()
      expect(report.successPercent).toBeGreaterThan(15)
      expect(report.averageHQPercent).toBe(1)
      expect(report.medianHQPercent).toBe(1)
    })

    it('should be consistent with current rotations', () => {
      const acchanMacro = [new InitialPreparations(), new ComfortZone(), new InnerQuiet(), new SpecialtyReflect(),
        new SteadyHandII(), new PieceByPiece(), new PrudentTouch(), new PrudentTouch(), new PrudentTouch(), new PrudentTouch(),
        new Observe(), new FocusedTouch(), new ManipulationII(), new ComfortZone(), new Ingenuity(), new Observe(),
        new FocusedTouch(), new GreatStrides(), new Observe(), new FocusedTouch(), new IngenuityII(), new SteadyHandII(),
        new Innovation(), new PrudentTouch(), new GreatStrides(), new ByregotsMiracle(), new PieceByPiece(),
        new Rumination(), new Ingenuity(), new Observe(), new FocusedSynthesis(), new Observe(), new FocusedSynthesis(),
        new CarefulSynthesisIII()]
      const simulation = new Simulation(gradeII_infusion_of_str_Recipe, acchanMacro, acchan_stats)
      simulation.run(true)
      expect(simulation.progression).toBe(3555)
      expect(simulation.quality).toBe(24831)
      expect(simulation.availableCP).toBe(0)
    })
  })
})