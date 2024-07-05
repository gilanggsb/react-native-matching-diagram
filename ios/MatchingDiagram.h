
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNMatchingDiagramSpec.h"

@interface MatchingDiagram : NSObject <NativeMatchingDiagramSpec>
#else
#import <React/RCTBridgeModule.h>

@interface MatchingDiagram : NSObject <RCTBridgeModule>
#endif

@end
