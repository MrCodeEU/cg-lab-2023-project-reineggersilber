class MyAnimation extends Animation{
    stop() {
        this.running = false;
      }
    
      reset() {
        this.running = false;
        this.currentIndex = 0;
        this.currentSegment = this.segments[this.currentIndex];
        this.segmentProgress = 0;
        this.previousSegmentMatrix = this.transformNode.matrix;
      }
    
      update(deltaTimeInMilliseconds) {
        if (this.running) {
          this.segmentProgress += deltaTimeInMilliseconds;
          //Switch segment if appropriate
          while (this.segmentProgress >= this.currentSegment.duration) {
            this.segmentProgress -= this.currentSegment.duration;
            this.currentIndex++;
            //If we reached the last segment, loop or end the animation
            if (this.currentIndex >= this.segments.length) {
              if (this.looping) {
                this.currentIndex = 0;
              } else {
                this.running = false;
                this.didRun = true;
                return;
              }
            }
            //Otherwise, remember the end of the current segment as basis for the next
            this.previousSegmentMatrix = (typeof this.currentSegment.matrix === 'function') ? this.currentSegment.matrix(1) : this.currentSegment.matrix;
            //And switch to the next segment
            this.currentSegment = this.segments[this.currentIndex];
          }
    
          //Interpolate the new matrix
          var progressFactor = this.segmentProgress / this.currentSegment.duration;
          var interpolatedMatrix;
          if (typeof this.currentSegment.matrix === 'function') {
            interpolatedMatrix = this.currentSegment.matrix(progressFactor);
          } else {
            interpolatedMatrix = mat4.add(mat4.create(), mat4.multiplyScalar(mat4.create(), this.currentSegment.matrix, progressFactor), mat4.multiplyScalar(mat4.create(), this.previousSegmentMatrix, 1 - progressFactor));
          }
          this.transformNode.matrix = interpolatedMatrix;
        }
      }
}