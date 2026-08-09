// Canonical inter-section vertical padding for the homepage. Sourced from
// the Competencies -> BestCases transition (confirmed as the "correct"
// rhythm) and reused everywhere instead of each section carrying its own
// slightly-different value -- that drift (e.g. SocialProof previously
// using pt-28/pb-28 md:pt-32/pb-32, roughly double this) is what made the
// gap after the Hero read as oversized, especially on mobile where the
// unprefixed step here is what actually governs.
export const SECTION_PADDING = 'py-16 md:py-24 lg:py-28';
