// Casing consolidation: re-exporting from the canonical PascalCase file to resolve build conflicts.
// This ensures that both 'experiences.tsx' and 'Experiences.tsx' refer to the same component definition.
import Experiences from './Experiences';
export default Experiences;