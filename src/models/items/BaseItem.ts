import { strict } from "assert";

/** An Item can have unlimited Tabs
 * Example
 * -------
 * instance of CountersunkScrew could have Tags for a Project, etc...
 */
type Tag = string;

/** string? (for SVG)?
 * path?
 * Union of both ?
 */
type Icon = string;

enum MeasurementSystem {
    "metric" = "mm",
    "imperial" = "in",
}


/**
 * make the types equivalent to a help message ?  
 * see Property Decorators:
 *   [Property Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
 */
enum ScrewDriveType {
    /** Internal Hex Socket */
    Allen,
    /** External Hex Socket */
    Hex,
    Square,
    Phillips,
    /** Flathead aka Regular */
    Flat,
    /** aka Torx */
    Star,
    /** Star Drive (Torx) with Pin in center */
    SecurityStar,
}

/** TODO: Make equal to appropriate classes which _may_ have special properties ?
 * TODO: Provide links to specs / description of each Type
 */
enum ScrewHeadType {
    Hex,
    Cap,
    Button,
}

interface Item {
    type: ItemType
}

interface Screw extends Item {
    icon: Icon;
    unit: MeasurementSystem;
    length: number;
    drive: ScrewDriveType;
    head: ScrewHeadType;
}

// class CountersunkScrew implements Screw {
//     type: ItemType;
//     icon: Icon;
//     unit: MeasurementSystem;
//     length: number;
//     drive: ScrewDriveType;
//     head: ScrewHeadType;
// }

class ItemType {
    static Construction: {
        Hardware: {
            Screw: {
                // Countersunk: CountersunkScrew;
            }
        }
    }

}

/** could also do nested classes */
class ItemTypeNested {
    static ConstructionType = class ConstructionType {
        static HardwareTwo = class HardwareType {
            static Screw = "Screw";
        };
    };
}

let fooNestedClass = ItemTypeNested.ConstructionType.HardwareTwo.Screw;

// let fooNestedObject = ItemType.Construction.Hardware.Screw.Countersunk;

// class HardwareType {
//     public foobar: string;

//     class ToolType {
    
//     }
// }

// class ConstructionType {
//     Hardware: HardwareType;
// }

// class ElectronicsType {

// }




/**
 * Defines common Item Properties and Methods  
 * All Items inherit from BaseItem
//  */
// class BaseItem {
//     public static types
// }